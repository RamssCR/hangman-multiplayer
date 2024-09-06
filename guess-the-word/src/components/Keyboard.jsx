import '../styles/keyboard.css'

function Keyboard() {
    const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"]

    return (
        <div className="keyboard">
            {chars.map((char, index) => <button className="btn-char" key={index}>{char}</button>)}
        </div>
    );
}

export default Keyboard;