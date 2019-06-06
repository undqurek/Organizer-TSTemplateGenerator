#!/bin/bash

script_dir=$(dirname "$(realpath "$0")")

cd "${script_dir}/TemplateGenerator/";

"./run.sh" "../../src/main/webapp/resources";