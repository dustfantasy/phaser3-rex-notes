import Sizer from '../sizer/Sizer.js';
import Space from '../utils/Space.js';
import ButtonSetInteractive from './ButtonSetInteractive.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Buttons extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create 
        super(scene, config);
        this.type = 'rexButtons';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var buttons = GetValue(config, 'buttons', undefined);
        if (buttons && buttons.length === 0) {
            buttons = undefined;
        }

        // Space
        var buttonSpace = GetValue(config, 'space', 0);

        if (background) {
            this.addBackground(background);
        }

        if (buttons) {
            var groupName = GetValue(config, 'groupName', undefined);
            var buttonsAlign = GetValue(config, 'align', undefined); // undefined/left/top: no space
            var clickConfig = GetValue(config, 'click', undefined);

            // Add space
            if (
                (buttonsAlign === 'right') ||
                (buttonsAlign === 'bottom') ||
                (buttonsAlign === 'center')
            ) {
                this.add(Space(scene), 1, 'center', 0, false);
            }

            var button, padding;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                button = buttons[i];
                // Add to sizer
                if (this.orientation === 0) {
                    padding = {
                        left: (i >= 1) ? buttonSpace : 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                } else {
                    padding = {
                        left: 0,
                        right: 0,
                        top: (i >= 1) ? buttonSpace : 0,
                        bottom: 0
                    }
                }
                this.add(button, 0, 'center', padding, true);
                ButtonSetInteractive.call(this, button, groupName, i, clickConfig);
            }

            // Add space
            if (buttonsAlign === 'center') {
                this.add(Space(scene), 1, 'center', 0, false);
            }
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.buttons = buttons;
    }
}

const defaultConfig = {};

export default Buttons;