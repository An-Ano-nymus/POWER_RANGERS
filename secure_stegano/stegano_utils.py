from PIL import Image

# Helper to convert text to binary
def text_to_binary(text):
    return ''.join(format(ord(char), '08b') for char in text)

# Helper to convert binary to text
def binary_to_text(binary_data):
    chars = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    return ''.join([chr(int(char, 2)) for char in chars])

# Hide text in image using LSB steganography
def hide_text_in_image(image_path, text, output_path):
    img = Image.open(image_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    binary_data = text_to_binary(text) + '1111111111111110'  # Delimiter to mark end
    data_index = 0
    pixels = list(img.getdata())

    new_pixels = []
    for pixel in pixels:
        r, g, b = pixel
        if data_index < len(binary_data):
            r = (r & ~1) | int(binary_data[data_index])
            data_index += 1
        if data_index < len(binary_data):
            g = (g & ~1) | int(binary_data[data_index])
            data_index += 1
        if data_index < len(binary_data):
            b = (b & ~1) | int(binary_data[data_index])
            data_index += 1
        new_pixels.append((r, g, b))
    
    img.putdata(new_pixels)
    img.save(output_path)

# Extract hidden text from image
def extract_text_from_image(image_path):
    img = Image.open(image_path)
    pixels = list(img.getdata())

    binary_data = ''
    for pixel in pixels:
        for color in pixel[:3]:
            binary_data += str(color & 1)
    
    # Find the delimiter
    end_marker = '1111111111111110'
    end_index = binary_data.find(end_marker)
    if end_index != -1:
        binary_data = binary_data[:end_index]
    
    return binary_to_text(binary_data)
