sudo apt-get install python3.9-venv -y
curl -fsSL -o get-platformio.py https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py
python3 get-platformio.py

fish -c "set -U fish_user_paths /home/vscode/.platformio/penv/bin \$fish_user_paths"
