import base64
from PIL import Image

input_path = r"c:\Users\najer\OneDrive\Desktop\NUEVA_ACADEMIA_BASE\images\24fd1862-0030-46de-8461-9e5d7038184b.jfif"
output_path = r"c:\Users\najer\OneDrive\Desktop\NUEVA_ACADEMIA_BASE\client\public\logo.svg"

try:
    with open(input_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")

    with Image.open(input_path) as img:
        width, height = img.size

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <image href="data:image/jpeg;base64,{encoded_string}" width="{width}" height="{height}" />
</svg>"""

    with open(output_path, "w", encoding="utf-8") as svg_file:
        svg_file.write(svg_content)

    print("SVG created successfully!")
except Exception as e:
    print(f"Error: {e}")
