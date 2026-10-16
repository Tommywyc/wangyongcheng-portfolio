"""Create delivery variants from the current portrait without changing its crop."""

from pathlib import Path

from PIL import Image


def main() -> None:
    directory = Path(__file__).resolve().parents[1] / "public" / "images"
    with Image.open(directory / "hero-library.png") as source:
        portrait = source.convert("RGB")
        for width in (480, 768, 1086):
            height = round(portrait.height * width / portrait.width)
            variant = portrait.resize((width, height), Image.Resampling.LANCZOS)
            output = directory / f"hero-library-{width}.webp"
            variant.save(output, "WEBP", quality=88, method=6)
            print(f"{output.name}: {width}x{height}, {output.stat().st_size} bytes")


if __name__ == "__main__":
    main()
