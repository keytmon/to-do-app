document.addEventListener("DOMContentLoaded", function (){
    const themeSwitch = document.querySelector('.theme-switch');
    const darkTheme = document.querySelector('.dark');
    const lightTheme = document.querySelector('.light');
    let currentTheme = lightTheme;
    const changeTheme = () => {
        if (currentTheme === darkTheme) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            currentTheme = lightTheme;
        } else if (currentTheme === lightTheme){
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            currentTheme = darkTheme;
        }
    }
    themeSwitch.addEventListener("click", changeTheme);
})