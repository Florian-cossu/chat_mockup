# Chat mockup
An HTML GUI that takes a JSON file in and generate a fake messenger app interface to create previews
Check this [codepen live demo](https://codepen.io/Florian-Cossu/pen/zYXbxXg)

| Large screen version             | Mobile screen version             |
| -------------------------------- | --------------------------------- |
| ![image](misc/large_preview.png) | ![image](misc/mobile_preview.png) |

## JSON input data structure

The json file contains several properties:*
1. contact: set it's value to any contact name you want displayed inside the top bar
2. pic_url: If you want to have a picture displayed as the contact profile picture you can just add an URL to the picture file as the value
3. messages contains multiple properties.
    - index: index that starts from 0,
        - in/out property. It defines whether the messages enclosed in the array were sent or received,
            - The elements of the array are defined as follow (migth be subjected to changes):
                - message: value can be any message you want
                - emoji: let you define whether someone reacted to the message using an emoji which will be displayed

### example
```
{
    "contact": "Florian",
    "pic_url": "https://infograflow.com/images/photo.jpg",
    "messages": {
        "0": {
            "in": [
                {
                    "message": "hello",
                    "emoji": null
                },
                {
                    "message": "How R u?",
                    "emoji": "👋"
                }
            ]
        },
        "1": {
            "out": [
                {
                    "message": "hey",
                    "emoji": null
                },
                {
                    "message": "Good thx so much. Here's my chat mockup I've been working on. Check it out",
                    "emoji": null
                },
                {
                    "message": "Do you like this large version preview export?",
                    "emoji": "👍"
                }
            ]
        }
    }
}
```