<?php
namespace Bitrix\Wizard\Steps;

use Bitrix\Main,
	Bitrix\Main\Localization\Loc,
	Bitrix\Wizard\Tools\ModuleChecker;

Loc::loadMessages(__FILE__);

/**
 * Class ModuleInstallStep
 * Install required modules
 *
 * @package Bitrix\Wizard\Steps
 */
class ModuleInstallStep extends \CWizardStep
{
	private $currentStepName = __CLASS__;

	/** @var \SaleCrmSiteMaster */
	private $component = null;

	/** @var ModuleChecker */
	private $moduleChecker;

	/** @var array */
	private $modules = [];

	/**
	 * Prepare next/prev buttons
	 *
	 * @throws \ReflectionException
	 */
	protected function prepareButtons()
	{
		$steps = $this->component->getSteps($this->currentStepName);

		$shortClassName = (new \ReflectionClass($this))->getShortName();

		if (isset($steps["NEXT_STEP"]))
		{
			$this->SetNextStep($steps["NEXT_STEP"]);
			$this->SetNextCaption(Loc::getMessage("SALE_CSM_WIZARD_".strtoupper($shortClassName)."_NEXT"));
		}
		if (isset($steps["PREV_STEP"]))
		{
			$this->SetPrevStep($steps["PREV_STEP"]);
			$this->SetPrevCaption(Loc::getMessage("SALE_CSM_WIZARD_".strtoupper($shortClassName)."_PREV"));
		}
	}

	/**
	 * Initialization step id, title and next/prev step
	 *
	 * @throws \ReflectionException
	 */
	public function initStep()
	{
		$this->component = $this->GetWizard()->GetVar("component");
		$this->moduleChecker = $this->component->getModuleChecker();

		$this->SetStepID($this->currentStepName);
		$this->SetTitle(Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_TITLE"));

		$this->prepareButtons();
	}

	/**
	 * Show step content
	 *
	 * @return bool
	 * @throws Main\ArgumentOutOfRangeException
	 */
	public function showStep()
	{
		$wizard =& $this->GetWizard();

		if ($this->GetErrors())
		{
			return false;
		}

		$this->modules = $this->GetWizard()->GetVar("modules");
		$this->moduleChecker->setInstallStatus();

		ob_start();
		?>
		<div class="adm-site-master-progress-container" id="result">
			<div class="adm-site-master-progress-counter">
				<div class="adm-site-master-progress-container-num" id="progressBar_percent"></div>
				<div class="adm-site-master-progress-container-per">%</div>
			</div>

			<img src="<?=$this->component->getPath()?>/wizard/images/install-complete-icon.svg" alt="" class="adm-site-master-progress-complete">
			<div class="adm-site-master-progress-complete-text">
				<?=Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_INSTALL_FINISH")?>
			</div>
		</div>

		<div class="adm-site-master-progress">
			<div class="ui-progressbar ui-progressbar-lg ui-progressbar-success">
				<div class="ui-progressbar-track">
					<div class="ui-progressbar-bar" id="progressBar" style="width: 0%;"></div>
				</div>
			</div>
		</div>

		<div class="adm-site-master-progress-description" id="progress_description">
			<?=Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_INSTALL_WAIT1")?><br>
			<?=Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_INSTALL_WAIT2")?>
		</div>

		<div class="adm-slider-buttons" id="button_submit_wrap" style="display: none">
			<div class="ui-btn-container ui-btn-container-center">
				<button type="submit" class="ui-btn ui-btn-primary">
					<?=Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_NEXT")?>
				</button>
			</div>
		</div>

		<div id="error_container" style="display: none; margin-top: 25px">
			<div class="ui-alert ui-alert-danger ui-alert-inline ui-alert-icon-danger">
				<span class="ui-alert-message" id="error_text"></span>
			</div>

			<div class="adm-slider-buttons" id="error_buttons">
				<div class="ui-btn-container ui-btn-container-center">
					<button type="button" id="error_retry_button" class="ui-btn ui-btn-primary" onclick="">
						<?=Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_RETRY_BUTTON")?>
					</button>
					<button type="button" id="error_skip_button" class="ui-btn ui-btn-primary" onclick="">
						<?=Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_SKIP_BUTTON")?>
					</button>
				</div>
			</div>
		</div>
		<?
		$modulesName = array_keys($this->modules);
		echo $this->ShowHiddenField("nextStep", $modulesName[0]);
		echo $this->ShowHiddenField("nextStepStage", "");
		?><iframe style="display:none;" id="iframe-post-form" name="iframe-post-form" src="javascript:''"></iframe><?
		list($firstModule, $stage) = $this->getFirstModule();

		$formName = $wizard->GetFormName();
		$nextStepVarName = $wizard->GetRealName("nextStep");
		$messages = Loc::loadLanguageFile(__FILE__);
		?>

		<script type="text/javascript">
			BX.message(<?=\CUtil::PhpToJSObject($messages)?>);
			var ajaxWizardForm = new CAjaxWizardForm("<?=$formName?>", "iframe-post-form", "<?=$nextStepVarName?>");
			ajaxWizardForm.Post("<?=$firstModule?>", "<?=$stage?>");
		</script>
		<?
		$content = ob_get_contents();
		ob_end_clean();

		$this->content = $content;

		return true;
	}

	/**
	 * @return bool
	 * @throws Main\ArgumentNullException
	 * @throws Main\SystemException
	 */
	function onPostForm()
	{
		$wizard =& $this->GetWizard();
		if ($wizard->IsPrevButtonClick())
		{
			return false;
		}

		$this->modules = $this->GetWizard()->GetVar("modules");
		$moduleId = $wizard->GetVar("nextStep");
		$moduleStage = $wizard->GetVar("nextStepStage");

		if ($moduleId == "finish")
		{
			$modulesRequired = $wizard->GetVar("modulesRequired");
			$this->moduleChecker->setRequiredModules($modulesRequired);
			$checkModules = $this->moduleChecker->checkInstalledModules();
			if ($checkModules["NOT_INSTALL"])
			{
				$wizard->SetCurrentStep("Bitrix\Wizard\Steps\ModuleStep");
			}
			else
			{
				$this->moduleChecker->deleteInstallStatus();
				$wizard->SetCurrentStep("Bitrix\Wizard\Steps\SiteInstructionStep");
			}
			return true;
		}

		if ($moduleStage != "skip")
		{
			$this->installModule($moduleId);

			$cacheManager = Main\Application::getInstance()->getManagedCache();
			$cacheManager->clean("b_module");
			$cacheManager->clean("b_module_to_module");
		}

		if ($errors = $this->GetErrors())
		{
			$arError[] = Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_ERROR_OCCURED", [
				"#MODULE_NAME#" => $this->modules[$moduleId]["name"]
			]);
			foreach ($errors as $error)
			{
				$arError[] = $error[0];
			}
			$arError[] = Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_ERROR_NOTICE", [
				"#MODULES_LINK#" => "/bitrix/admin/module_admin.php?lang=".LANGUAGE_ID
			]);
			$strError = implode("<br>", $arError);

			$response = '';
			$response .= "window.ajaxWizardForm.ShowError('".$strError."')";
			die("[response]".$response."[/response]");
		}

		list($nextModule, $nextModuleStage, $stepsComplete) = $this->getModuleStep($moduleId);

		if ($nextModule == "finish")
		{
			$response = '';
			$response .= "window.ajaxWizardForm.StopAjax();";
			$response .= "window.ajaxWizardForm.SetStatus('100');";
			$response .= "window.ajaxWizardForm.Post('".$nextModule."', '".$nextModuleStage."');";
		}
		else
		{
			$percent = round($stepsComplete);

			$response = '';
			$response .= "window.ajaxWizardForm.SetStatus('".$percent."');";
			$response .= "window.ajaxWizardForm.Post('".$nextModule."', '".$nextModuleStage."');";
		}

		die("[response]".$response."[/response]");
	}

	/**
	 * @return array
	 */
	protected function getFirstModule()
	{
		$modules = array_keys($this->modules);
		foreach ($modules as $module)
		{
			$stage = "";
			return [
				$module,
				$stage
			];
		}

		return [
			"module_not_found",
			"finish"
		];
	}

	/**
	 * Get next module for installation
	 *
	 * @param $moduleId
	 * @return array
	 */
	protected function getModuleStep($moduleId)
	{
		$modules = array_keys($this->modules);
		$nextService = $nextServiceStage = "finish";

		$key = array_search($moduleId, $modules);
		if ($key !== false)
		{
			if (isset($modules[$key+1]))
			{
				$nextService = $nextServiceStage = $modules[$key+1];
			}
		}

		if (!in_array($moduleId, $modules) || $nextService == "finish")
		{
			return [
				$nextService,
				$nextServiceStage,
				100
			];
		}

		$wizard =& $this->GetWizard();

		$nextServiceStage = "";
		$modulesCount = $wizard->GetVar("modulesCount");
		$stepsComplete = round((($key + 1) * 100) / $modulesCount);

		$wizard->SetVar("modules", $modules);

		return [
			$nextService,
			$nextServiceStage,
			$stepsComplete
		];
	}

	/**
	 * @param $moduleId
	 */
	protected function onModuleInstalledEvent($moduleId)
	{
		foreach (GetModuleEvents("main", "OnModuleInstalled", true) as $arEvent)
		{
			\ExecuteModuleEventEx($arEvent, array($moduleId));
		}
	}

	/**
	 * Install required modules
	 *
	 * @param $moduleId
	 * @return bool
	 */
	protected function installModule($moduleId)
	{
		/** @noinspection PhpVariableNamingConventionInspection */
		global $DB, $APPLICATION;

		if (strtolower($DB->type) == "mysql" && defined("MYSQL_TABLE_TYPE") && strlen(MYSQL_TABLE_TYPE)>0)
		{
			$res = $DB->Query("SET storage_engine = '".MYSQL_TABLE_TYPE."'", true);
			if(!$res)
			{
				//mysql 5.7 removed storage_engine variable
				$DB->Query("SET default_storage_engine = '".MYSQL_TABLE_TYPE."'", true);
			}
		}

		$this->onModuleInstalledEvent($moduleId);

		if (!Main\ModuleManager::isModuleInstalled($moduleId))
		{
			$module = \CModule::CreateModuleObject($moduleId);
			if (!is_object($module))
			{
				$this->SetError(Loc::getMessage("SALE_CSM_WIZARD_MODULEINSTALLSTEP_INSTALL_ERROR",
					["#MODULE_NAME#" => $moduleId]
				));
				return false;
			}

			if (method_exists($module, "CheckModules"))
			{
				$module->CheckModules();
				if ($ex = $APPLICATION->GetException())
				{
					$this->SetError($ex->GetString());
					return false;
				}
			}

			if (!$module->InstallDB())
			{
				if ($ex = $APPLICATION->GetException())
				{
					$this->SetError($ex->GetString());
				}

				return false;
			}

			$module->InstallEvents();

			/** @noinspection PhpVoidFunctionResultUsedInspection */
			if (!$module->InstallFiles())
			{
				if ($ex = $APPLICATION->GetException())
				{
					$this->SetError($ex->GetString());
				}

				return false;
			}
		}

		return true;
	}
}