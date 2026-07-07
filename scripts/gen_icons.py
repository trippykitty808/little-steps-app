"""One-time icon generator for the Little Steps PWA. Not part of the shipped app runtime."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "icons")
os.makedirs(OUT, exist_ok=True)

BG = (201, 221, 182)       # #C9DDB6
FG = (67, 65, 75)          # #43414B
FONT_PATH = os.path.join(os.path.dirname(__file__), "Quicksand-Bold.ttf")  # actual app heading font

def load_bold_font(size):
    font = ImageFont.truetype(FONT_PATH, size)
    try:
        font.set_variation_by_axes([700])  # Quicksand's variable-font Bold weight
    except Exception:
        pass
    return font

def rounded_icon(size, corner_pct, filename, pad_text_pct=0.34):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * corner_pct)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BG)

    font_size = int(size * pad_text_pct)
    font = load_bold_font(font_size)
    text = "LS"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), text, font=font, fill=FG)
    img.save(os.path.join(OUT, filename))
    print("wrote", filename)

def maskable_icon(size, filename):
    # Maskable icons must be full-bleed; keep glyph inside the ~80% safe zone.
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, size, size], fill=BG)
    font_size = int(size * 0.30)
    font = load_bold_font(font_size)
    text = "LS"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), text, font=font, fill=FG)
    img.save(os.path.join(OUT, filename))
    print("wrote", filename)

rounded_icon(192, 0.22, "icon-192.png")
rounded_icon(512, 0.22, "icon-512.png")
rounded_icon(180, 0.22, "apple-touch-icon.png")
rounded_icon(32, 0.22, "favicon-32.png")
rounded_icon(16, 0.22, "favicon-16.png")
maskable_icon(192, "icon-maskable-192.png")
maskable_icon(512, "icon-maskable-512.png")
