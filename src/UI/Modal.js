export class Modal {
  constructor(contentId) {
    this.contentTemplEl = document.getElementById(contentId);
    this.modalTemplEl = document.getElementById("modal-template");
  }
  show() {
    const modalElements = document.importNode(this.modalTemplEl.content, true);
    this.modalEl = modalElements.querySelector(".modal");
    this.backDropEl = modalElements.querySelector(".backdrop");
    const contentEl = document.importNode(this.contentTemplEl.content, true);

    this.modalEl.append(contentEl);
    document.body.insertAdjacentElement("afterbegin", this.modalEl);
    document.body.insertAdjacentElement("afterbegin", this.backDropEl);
  }
  hide() {
      if(this.modalEl){
          this.modalEl.remove();
          this.backDropEl.remove();
      }
  }
}
