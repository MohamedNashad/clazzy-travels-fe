export const capitalize = (text: any) => {
    return text
        .replace('_', ' ')
        .replace('-', ' ')
        .toLowerCase()
        .split(' ')
        .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};

export function capitalizeFirstLetter(str: string): string {
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}
