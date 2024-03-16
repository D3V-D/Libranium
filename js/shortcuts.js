import ninjaKeys from 'https://cdn.jsdelivr.net/npm/ninja-keys@1.2.2/+esm'

const searchbar = document.getElementById("fake-search")

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
        id: "Theme",
        title: "Change Theme",
        hotkey: "cmd+d",
        mdIcon: "dark_mode",
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
                mdIcon: "topic",
                keywords: "text, description, words, custom",
                handler: () => {
                    window.location.href = "/description"
                }
            },
            {
                id: "ByTopic",
                title: "Generate by Topics",
                hotkey: "cmd+o",
                mdIcon: "description",
                keywords: "text, description, words, custom",
                handler: () => {
                    window.location.href = "/topics"
                }
            },
            {
                id: "ByLP",
                title: "Generate by Lesson Plan",
                hotkey: "cmd+l",
                mdIcon: "school",
                keywords: "text, description, words, custom",
                handler: () => {
                    window.location.href = "/LP"
                }
            }
        ]
    }
];
const ninja = document.querySelector("ninja-keys");
ninja.data = hotkeys;

searchbar.addEventListener("click", () => {
    console.log("hi")
    ninja.open()
})