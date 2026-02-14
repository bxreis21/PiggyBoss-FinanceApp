// Define a common interface for theme colors
interface ThemeColors {
    [key: string]: string;
}

const common_theme: ThemeColors = {
    strong_pink: '#F1109B',
    piggy_pink: '#FF66C4',
    purple_purple: '#710d9b',
    good_green: '#2ecc71',
    bad_red: '#c0392b',
}

const dark_theme: ThemeColors = {
    font: '#f5f5f5',
    week_dark_tech: '#16102f',
    dark_tech: '#17142a',
    strong_dark_tech: '#0f0b1f',
}

const light_theme: ThemeColors = {
    font: '#000000',
    week_light_tech: '#f0f4e0',
    light_tech: '#e8ebd5',
    strong_light_tech: '#e9efd0',
}

export { common_theme, dark_theme, light_theme }
