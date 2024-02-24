import ninjaKeys from 'https://cdn.jsdelivr.net/npm/ninja-keys@1.2.2/+esm'

const hotkeys = [
    {
        id: "Home",
        title: "Open Home",
        hotkey: "cmd+h",
        mdIcon: "home",
        handler: () => {
            console.log("navigation to home");
        }
    },
    {
        id: "Open Projects",
        title: "Open Projects",
        hotkey: "cmd+p",
        mdIcon: "apps",
        handler: () => {
            console.log("navigation to projects");
        }
    },
    {
        id: "Theme",
        title: "Change theme...",
        mdIcon: "desktop_windows",
        children: [
            {
                id: "Light Theme",
                title: "Change theme to Light",
                mdIcon: "light_mode",
                handler: () => {
                    console.log("theme light");
                }
            },
            {
                id: "Dark Theme",
                title: "Change theme to Dark",
                mdIcon: "dark_mode",
                keywords: "lol",
                handler: () => {
                    console.log("theme dark");
                }
            }
        ]
    }
];
const ninja = document.querySelector("ninja-keys");
ninja.data = hotkeys;