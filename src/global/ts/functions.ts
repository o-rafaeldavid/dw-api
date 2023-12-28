export function mapear(
    number : number,
    inMin : number,
    inMax : number,
    outMin : number,
    outMax : number
) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}




export const capitalizar = (str : string) => {
    const primeiroChar = str.charAt(0)
    return primeiroChar.toUpperCase() + str.substring(1)
}

export const capitalizarPosTracos = (str : string) => {
    let strSplitted = str.split('-')
    strSplitted.forEach(
        (split : string, index : number) => { strSplitted[index] = capitalizar(split) }
    )

    return strSplitted.join(' ')
}