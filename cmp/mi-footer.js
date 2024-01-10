class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2023
        Angel Hernandez Martinez
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
