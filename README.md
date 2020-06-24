# sprite-json-splitter
Purpose of the application is splitting image sprite sheet into individual images using JSON schema (e.g. created with Texture Packer).  
Can be useful when you have no source images but need to edit sprite sheet.  
After splitting, you can create new sprite sheet using texture editor (e.g. Texture Packer)

## JSON example
```$json
{
    "frames": {
        "first.png": {
            "frame": {"x":10,"y":20,"w":50,"h":50}
        },
        "second.png": {
            "frame": {"x":100,"y":200,"w":40,"h":30}
        }
    }
}
```

## Options

Supports options  
- image
- schema
- destination [optional] - folder for separate images, by default creates `images` folder in current directory
- quality [optional] - 1-100 range, uses 100 as default

## Example

```bash
yarn start -image sprite.png -schema sprite.json
```

