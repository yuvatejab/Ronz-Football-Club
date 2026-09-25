import os
import re
import sys

directory = 'src/components/'
for filename in os.listdir(directory):
    if filename.endswith('.tsx'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()

        # Replace <h<h2 className='...' className='...'> with <h2 className='...'>
        new_content = re.sub(r'<h<(h[23])\s+className="[^"]*"\s+(className="[^"]*")>', r'<\1 \2>', content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Fixed {filename}')
