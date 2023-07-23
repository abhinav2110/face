import base64
from PIL import Image
import io

# Read the contents of the glasses.pngblob file
with open('glasses.pngblob', 'rb') as f:
    blob_data = f.read()

# Decode the blob data
decoded_data = base64.b64decode(blob_data)

# Create an in-memory binary stream to load the image
image_stream = io.BytesIO(decoded_data)

# Open the image using Pillow
image = Image.open(image_stream)

# Save the image as glasses.png
image.save('glasses.png', 'PNG')
