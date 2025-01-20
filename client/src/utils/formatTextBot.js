export const formatText = (text) => {
    let formattedText = text.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Expresión regular para enlaces [Texto](URL)
    formattedText = formattedText.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    return {__html: formattedText};
};
