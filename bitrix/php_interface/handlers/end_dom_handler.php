<?php 

use Bitrix\Main\EventManager;

// EventManager::getInstance()->addEventHandler(
//     'main',
//     'OnEndBufferContent',
//     array(
//         'ClInit',
//         'OnEndBufferContent'
//     )
// );

class ClInit
{
    const DOMAIN = "/";

    public static function OnEndBufferContent(&$data)
    {
        //$data = static::replaceOutput($data);
        
        $dom = static::getDom($data);

        //static::compressScripts($dom);
        static::compressStyles($dom);

        $data = $dom->saveHTML();
        $data = html_entity_decode($data);
        echo $data;
    }

    protected static function compressScripts($dom)
    {
        $all = '';
        $remove = array();
        $file_name = "script_" . md5($_SERVER["REQUEST_URI"]) . ".jsgz";

        foreach ($dom->getElementsByTagName("script") as $script) {
            $is_remove = true;
            if ($script->getAttribute('src')) {
                $src = $script->getAttribute('src');
                if (strpos($src, ".jsgz") === false) {
                    if (strpos($src, "http") === false || strpos($src, self::DOMAIN) === 0) {
                        $arUrl = explode("?", $src);
                        $arInfo = pathinfo($arUrl[0]);
                        if ($arInfo["basename"]) {
                            $content = file_get_contents($_SERVER["DOCUMENT_ROOT"].$arUrl[0]);
                            $content .= ";";
                            $content = preg_replace('#/\*(?:[^*]*(?:\*(?!/))*)*\*/#', '', $content);
                            $all .= "\n\n" . $content;
                        }
                    } else {
                        $content = file_get_contents($src);
                        $all .= "\n\n" . $content;
                    }
                }
            } else {
                $text = implode(array_map([$script->ownerDocument,"saveHTML"], iterator_to_array($script->childNodes)));
                $text = mb_convert_encoding($text, "UTF-8", 'HTML-ENTITIES');
                $text .= ";";
                $all .= "\n\n" . $text . "\n\n";
            }
            if ($is_remove) $remove[] = $script;
        }

        foreach ($remove as $item) {
            $item->parentNode->removeChild($item); 
        }

        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/compress/" . $file_name, gzencode($all));

        foreach ($dom->getElementsByTagName("body") as $body) {
            $element = $dom->createElement('script');
            $element->setAttribute('src', "/compress/" . $file_name . "?" . time());
            $body->appendChild($element);       
        }
    }

    protected static function compressStyles($dom)
    {
        $css = "";
        $remove = array();
        $file_name_css = "style_" . md5($_SERVER["REQUEST_URI"]) . ".cssgz";

        foreach ($dom->getElementsByTagName("link") as $script) {
            if ($script->getAttribute('href')) {
                $src = $script->getAttribute('href');
                $type = $script->getAttribute('type');
                if ($type != "text/css") continue;
                if (strpos($src, ".cssgz") === false) {
                    if (strpos($src, "http") === false || strpos($src, self::DOMAIN) === 0) {
                        $arUrl = explode("?", $src);
                        $arInfo = pathinfo($arUrl[0]);
                        if ($arInfo["basename"]) {                   
                            $arUrl[0] = str_replace($domain, "", $arUrl[0]);
                            $content = file_get_contents($_SERVER["DOCUMENT_ROOT"].$arUrl[0]);
                            $content = preg_replace(array('/\+/', '/\t+/', '/\n+/'), '', $content);
                            $content = str_replace(array('  '), '', $content);
                            $content = preg_replace('#/\*(?:[^*]*(?:\*(?!/))*)*\*/#', '', $content);
                            $css .= $content;
                        }
                    } else {
                        $content = file_get_contents($src);
                        $content = preg_replace('#/\*(?:[^*]*(?:\*(?!/))*)*\*/#', '', $content);
                        $css .= $content;
                    }
                }
            }
            $remove[] = $script;
        }

        foreach ($remove as $item) {
            $item->parentNode->removeChild($item); 
        }

        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/compress/" . $file_name_css, gzencode($css));

        foreach ($dom->getElementsByTagName("head") as $head) {
            $link = $dom->createElement('link');
            $link->setAttribute('href', "/compress/" . $file_name_css . "?" . time());
            $link->setAttribute('type', "text/css");
            $link->setAttribute('rel', "stylesheet");   
            $head->appendChild($link);
        }
    }

    protected static function getDom($data)
    {
        $DATA_DOM = mb_convert_encoding($data, 'HTML-ENTITIES', "UTF-8");
        $dom = new DOMDocument;
        $dom->loadHTML($DATA_DOM);

        return $dom;
    }

    protected static function replaceOutput($data)
    {
        $data = str_replace(' type=\'text/javascript\'', "", str_replace(' type="text/javascript"', "", $data));
        $data = preg_replace(array('/\r+/', '/\t+/'), '', $data);

        return $data;
    }
}

?>