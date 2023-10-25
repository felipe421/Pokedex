function CapitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function ConvertUpperCase(texto) {
    return texto.toUpperCase();
  }

export {CapitalizeWord, ConvertUpperCase}