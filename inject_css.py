import os
import glob

css_to_inject = """
    <!-- Mobile responsiveness overrides -->
    <style>
        #map-overlays {
            height: auto !important;
            min-height: 70px;
            display: flex !important;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            box-sizing: border-box;
        }
        .overlay {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            margin: 5px;
            box-sizing: border-box;
        }
        .top-left {
            order: 1;
        }
        .top-right {
            order: 2;
        }
        .center-top {
            order: 3;
            width: 100%;
            margin-top: 5px !important;
            font-size: 18px !important;
        }
        #map {
            height: calc(100vh - 120px) !important;
        }
        @media (min-width: 768px) {
            #map-overlays {
                flex-wrap: nowrap;
                padding: 10px 20px;
            }
            .top-left {
                order: 1;
                flex: 1;
                text-align: left;
            }
            .center-top {
                order: 2;
                flex: 2;
                width: auto;
                margin-top: 0 !important;
            }
            .top-right {
                order: 3;
                flex: 1;
                text-align: right;
            }
            #map {
                height: calc(100vh - 80px) !important;
            }
        }
        @media (max-width: 600px) {
            .overlay {
                padding: 8px !important;
                font-size: 14px !important;
            }
            .center-top {
                font-size: 16px !important;
            }
            .top-left, .top-right {
                flex: 1;
                text-align: center;
                margin: 2px;
            }
            #map {
                height: calc(100vh - 140px) !important;
            }
        }
    </style>
"""

files = glob.glob('*.html')
modified_count = 0
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    if "Mobile responsiveness overrides" in content:
        continue
        
    new_content = content.replace('</head>', css_to_inject + '</head>')
    
    with open(f, 'w') as file:
        file.write(new_content)
    modified_count += 1
        
print(f"Injected responsive CSS into {modified_count} HTML files.")
