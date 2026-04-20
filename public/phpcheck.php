<?php
echo 'PHP_VERSION: ' . PHP_VERSION . '<br>';
echo 'PHP_BINARY: ' . PHP_BINARY . '<br>';
echo 'Loaded ini: ' . php_ini_loaded_file() . '<br>';
echo 'curl.cainfo: ' . ini_get('curl.cainfo') . '<br>';
echo 'openssl.cafile: ' . ini_get('openssl.cafile') . '<br>';