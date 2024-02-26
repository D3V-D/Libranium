import ninjaKeys from 'https://cdn.jsdelivr.net/npm/ninja-keys@1.2.2/+esm'

const hotkeys = [
    {
        id: "Home",
        title: "Open Home",
        hotkey: "cmd+h",
        mdIcon: "home",
        handler: () => {
            window.location.href = "/"
        }
    },
    {
        id: "Generate",
        title: "Generate book recommendations...",
        hotkey: "cmd+g",
        mdIcon: "tips_and_updates",
        children: [
            {
                id: "ByPrev",
                title: "Generate By Previous Books",
                hotkey: "cmd+p",
                mdIcon: "schedule",
                keywords: "past, already, read",
                handler: () => {
                    window.location.href = "/prev_books"
                }
            },
            {
                id: "ByDesc",
                title: "Generate by Description",
                hotkey: "cmd+d",
                mdIcon: "description",
                keywords: "text, description, words, custom",
                handler: () => {
                    console.log("TODO")
                }
            }
        ]
    }
];
const ninja = document.querySelector("ninja-keys");
ninja.data = hotkeys;