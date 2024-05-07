import ninjaKeys from 'https://cdn.jsdelivr.net/npm/ninja-keys@1.2.2/+esm'

const searchbar = document.getElementById("fake-search")

const hotkeys = [
    {
        id: "Home",
        title: "Open Home",
        hotkey: "ctrl+h",
        mdIcon: "home",
        handler: () => {
            window.location.href = "/"
        }
    },
    {
        id: "Generate",
        title: "Generate book recommendations...",
        mdIcon: "tips_and_updates",
        children: [
            {
                id: "ByPrev",
                title: "Generate By Previous Books",
                hotkey: "ctrl+p",
                mdIcon: "schedule",
                keywords: "past, already, read",
                handler: () => {
                    window.location.href = "/prev_books"
                }
            },
            {
                id: "ByDesc",
                title: "Generate by Description",
                hotkey: "ctrl+d",
                mdIcon: "topic",
                keywords: "text, description, words, custom",
                handler: () => {
                    window.location.href = "/description"
                }
            },
        ]
    }
];
const ninja = document.querySelector("ninja-keys");
ninja.data = hotkeys;

searchbar.addEventListener("click", () => {
    ninja.open()
})