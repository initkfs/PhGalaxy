/*
* @author initkfs
* 
*/
import GameService from './GameService';
import DOMPurify from 'dompurify';

export default class JournalManager extends GameService {

    constructor(appServices, game, gameServices) {
        super(appServices, game, gameServices);

        this.journalContentNode = "span";
        this.separator = "br";
        this.useSeparator = true;
        this.useScroll = true;

        const journalNodeID = this.appServices.config.nodeJournalID;
        this.journalNode = document.getElementById(journalNodeID);

        if (!this.journalNode) {
            this.appServices.logger.error(`Target node for game journal not found in the DOM: '${journalNodeID}'`);
        }
    }

    //TODO async?
    append(text) {

        if (!this.journalNode) {
            return;
        }

        let journalContentNode = document.createElement(this.journalContentNode);

        let journalText = DOMPurify.sanitize(text);
        journalContentNode.innerHTML = journalText;
        this.journalNode.appendChild(journalContentNode);

        if (this.useSeparator) {
            this.appendSeparator();
        }

        if (this.useScroll) {
            try {
                this.scroll(this.journalNode);
            } catch (e) {
                this.appServices.logger.error(e);
            }
        }
    }

    scroll(element) {

        if (!element) {
            return;
        }

        element.scrollTop = element.scrollHeight;
    }

    appendSeparator() {

        if (!this.journalNode) {
            return;
        }
        let br = document.createElement(this.separator);
        this.journalNode.appendChild(br);
    }

    destroy(){
        super.destroy();
    }
}