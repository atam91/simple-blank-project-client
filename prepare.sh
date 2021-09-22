#!/bin/bash

echo -e '\e[36m   Installing dependencies';
npm install;
echo -e "\033[0m";

################################################################################

echo -e '\e[36m   Checking local configs';
if [ ! -f "src/config/index.js" ]; then
    echo -e '\e[36m     Creating src/config/index.js';
    cp src/config/index{.example,}.js;
else
    echo -e '\e[37m     Skipping src/config/index.js';
fi
echo -e "\033[0m";

################################################################################

echo -e '\e[32m   Client is ready.';
echo -e "\033[0m";

