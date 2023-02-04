class FPHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `  
<header>
    <ul>
        <a href="#triogame"><li>TRIOGAME</li></a>
        <a href="#aboutGames"><li>Об играх</li></a>
        <a href="#snake"><li>Змейка</li></a>
        <a href="#ping-pong"><li>Пинг-Понг</li></a>
        <a href="#erudite"><li>Эрудит</li></a>
    </ul>
</header>
        `  
    }
}
customElements.define('fp-header', FPHeader)

class FPFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
<footer>
    <p>Особая благодарность:</p>
    <p>Скакунову Илье Игоревичу, Дон Мармеладу, Администрации IT STEP.</p>
    <p>TRIOGAME studio.</p>
</footer>
        `  
    }
}
customElements.define('fp-footer', FPFooter)