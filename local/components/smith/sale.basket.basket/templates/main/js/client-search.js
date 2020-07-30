;(function(){
	'use strict';

	BX.namespace('BX.Sale.ClientSearch');

	BX.Sale.ClientSearch = function(component, clients)
	{
		this.component = component;
		this.clients = Object.assign([], clients);

		this.activeSearchMode = false;
		this.searchTimer = null;
		this.mouseOverClearSearch = false;

		this.shownClients = [];
		this.sortedClients = [];

		this.currentSearch = {
			query: '',
			delayed: false
		};

		this.bindEvents();
	};

	BX.Sale.ClientSearch.prototype.bindEvents = function()
	{
		var entity;
		var searchNode = this.component.getEntity(document.body, 'basket-client-search');

		entity = this.component.getEntity(searchNode, 'basket-client-search-input');
		if (BX.type.isDomNode(entity))
		{
			BX.bind(entity, 'keyup', BX.proxy(this.onSearchInput, this));
			BX.bind(entity, 'cut', BX.proxy(this.onSearchInput, this));
			BX.bind(entity, 'paste', BX.proxy(this.onSearchInput, this));
		}

		entity = this.component.getEntity(searchNode, 'basket-client-search-clear-btn');
		if (BX.type.isDomNode(entity))
		{
			BX.bind(entity, 'click', BX.delegate(function() {
				if (!this.searchInputEmpty())
				{
					this.clearSearchInput();
					this.onSearchChange();
				}
			}, this));
		}
	};

	BX.Sale.ClientSearch.prototype.onSearchInput = function()
	{
		var value = BX.type.isDomNode(BX.proxy_context) ? BX.util.trim(BX.proxy_context.value).toLowerCase() : '';

		if (this.currentSearch.query !== value)
		{
			this.currentSearch.query = value;
			this.onSearchChange();
		}
	};

	BX.Sale.ClientSearch.prototype.searchInputEmpty = function()
	{
		var input = this.component.getEntity(document.body, 'basket-client-search-input');
		return input.value.length === 0;
	};

	BX.Sale.ClientSearch.prototype.clearSearchInput = function()
	{
		this.currentSearch.query = '';

		var input = this.component.getEntity(document.body, 'basket-client-search-input');
		if (BX.type.isDomNode(input))
		{
			input.value = '';
			this.component.actionPool.selectClient('self');
		}
	};

	BX.Sale.ClientSearch.prototype.getTimeoutDuration = function()
	{
		return this.component.duration.searchTimer;
	};

	BX.Sale.ClientSearch.prototype.onSearchChange = function()
	{
		if (this.currentSearch.query.length)
		{
			clearTimeout(this.searchTimer);
			this.searchTimer = setTimeout(BX.proxy(this.enableSearchMode, this), this.getTimeoutDuration());
		}
		else
		{
			this.disableSearchMode();
		}
	};

	BX.Sale.ClientSearch.prototype.enableSearchMode = function()
	{
		var foundItemsHash;

		if (!this.activeSearchMode)
		{
			this.activeSearchMode = true;
		}

		this.shownClients = this.searchClients();

		this.clientListUpdate();
	};

	BX.Sale.ClientSearch.prototype.disableSearchMode = function()
	{
		clearTimeout(this.searchTimer);

		if (this.activeSearchMode)
		{
			this.activeSearchMode = false;
			this.shownClients = Object.assign([], this.clients);
			this.sortedClients = Object.assign([], this.clients);
		}

		this.clientListClear();
	};

	BX.Sale.ClientSearch.prototype.searchClients = function()
	{
		var clients = [];

		this.clients.forEach((client) => {
			if (typeof client === 'object')
			{
				if (client.name && this.searchClientMatch(client.name))
				{
					clients.push(client);
				}
			}
		});

		return clients;
	};

	BX.Sale.ClientSearch.prototype.searchClientMatch = function(client)
	{
		var match = false;

		if (BX.type.isNotEmptyString(this.currentSearch.query))
		{
			if (client.toLowerCase().indexOf(this.currentSearch.query) !== -1)
			{
				match = true;
			}
		}

		return match;
	};

	BX.Sale.ClientSearch.prototype.clientListUpdate = function() 
	{
		if (this.shownClients.length > 0) {
			var listNode = this.component.getEntity(document.body, 'basket-client-search-result');
			BX.style(listNode, 'display', 'block');
			BX.cleanNode(listNode);

			this.shownClients.forEach((client) => {
				var li = BX.create('li', {
					text: client.name,
				});
				listNode.append(li);
				BX.bind(li, 'click', BX.delegate(function() {
					this.onClientSelect(client);
				}, this));
			});
		}
	};

	BX.Sale.ClientSearch.prototype.clientListClear = function() 
	{
		var listNode = this.component.getEntity(document.body, 'basket-client-search-result');
		BX.cleanNode(listNode);
		BX.style(listNode, 'display', 'none');
	}

	BX.Sale.ClientSearch.prototype.onClientSelect = function(client)
	{
		var input = this.component.getEntity(document.body, 'basket-client-search-input');
		input.value = client.name;
		this.component.actionPool.selectClient(client.id);
		this.clientListClear();
	}
})();