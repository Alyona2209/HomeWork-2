(function () {
    'use strict'

    function createTagsField() {
        let tagsField = {
            element: makeFieldElement(),
            tags: new Set(),

            getTags() {
                return [...this.tags];
            },

            destroy() {
                this.element.removeEventListener('keypress', this);
                this.element.removeEventListener('keydown', this);
                this.element.removeEventListener('click', this);
                this.element.remove();
                this.tags.clear();
            },

            handleEvent(event) {
                switch (event.type) {
                    case 'keypress':
                        if (event.charCode === 44) {
                            makeTagElement(this.element);
                            event.preventDefault();
                        }
                        break;
                    case 'keydown':
                        if (event.keyCode === 13) {
                            makeTagElement(this.element);
                            event.preventDefault();
                        }
                        break;
                     case 'click':
                        let target = event.target.closest('.tags');
                        if (target) {
                            target.remove();
                            this.tags.delete(target.innerHTML);
                        }
                }
            }
        };

        tagsField.element.addEventListener('keypress', tagsField);
        tagsField.element.addEventListener('keydown', tagsField);
        tagsField.element.addEventListener('click', tagsField);

        function makeFieldElement() {
            let field = document.createElement('div');
            field.contentEditable = 'true';
            field.classList.add('field');

            return field;
        }

        function makeTagElement(field) {
            let tagText = field.lastChild.data;

            if (tagText) {
                if ( !tagsField.tags.has(tagText) ) {
                    tagsField.tags.add(tagText);

                    let tag = document.createElement('div');
                    tag.innerHTML = tagText;
                    tag.classList.add('tags');
                    tag.contentEditable = 'false';

                    field.insertBefore(tag, field.lastChild);
                }

                field.lastChild.remove();
            }
        }
        return tagsField;
    }

    let tagsField = createTagsField(),
        tagsField2 = createTagsField();
    document.body.append(tagsField.element, tagsField2.element);

    /*setTimeout(function () {
        alert(tagsField.getTags());
        tagsField.destroy();
    }, 15000);
    setTimeout(function () {
        alert(tagsField2.getTags());
        tagsField2.destroy();
    }, 20000);
*/
})();