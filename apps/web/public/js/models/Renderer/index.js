class Renderer {
    /**
     * @param {HTMLElement} container 
     * @param {string|HTMLElement} html 
     */
    mount(container, html) {
        if (typeof html === 'string') {
            container.innerHTML= html;
        } else {
            container.appendChild(html);
        }
    }


}

export default new Renderer();