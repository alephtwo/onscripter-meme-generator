# This is an imagemagick script which can run the preprocessing on onscripter images
# to generate properly transparent sprites.

files = Dir.glob('tsukihime/tachi/*.jpg')

files.each do |file|
  Dir.chdir(File.dirname(file)) do
    base = File.basename(file, '.jpg')

    # Split the image down the middle
    `convert -crop 50%x100% +repage #{file} #{base}.png`

    # There are now two images: the base and the mask, which is a negative
    image_path = "#{base}-0.png"
    negated_mask_path = "#{base}-1.png"

    # Negate the mask
    mask_path = "#{base}-1-mask.png"
    `convert -negate #{negated_mask_path} #{mask_path}`

    # Run the conversion
    `convert #{image_path} #{mask_path} -alpha Off -compose CopyOpacity -composite #{base}.png`

    File.delete(image_path)
    File.delete(negated_mask_path)
    File.delete(mask_path)
  end
end
