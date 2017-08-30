/*
* @author initkfs
*/

export default class ColorUtil {

    static toHexColor(webColor) {

        if (!webColor) {
            throw new TypeError("Web color is empty");
        }

        const colorPrefix = "#";

        if (!webColor.includes(colorPrefix)) {
            throw new Error(`Invalid web color: ${webColor}. Expected web color starts with ${colorPrefix}, ex: #FFFFF, #fffff`);
        }

        return webColor.replace(colorPrefix, "0x");
    }

}