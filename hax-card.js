import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxCard extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alt = '';
    
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        alt: { type: String }, 
        
    };
  }

  static get styles() {
    return [css`

    .card{
      background-color: var(--ddd-theme-default-alertNonEmergency);
      border-radius: 8px;
      padding: 16px;
      margin: 20px;
      border: var(--ddd-theme-default-keystoneYellow);
      border-width: 8px;
      width: 240px;
      height: 360px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
    }
    
    .card:hover{
      background-color: var(--ddd-theme-default-accent);
    }

    img {
      width: 240px;
      height: 200px;
      display: block;
      border-radius: 4px;
      
    }

    .details{
      text-align: center;
      font-size: 20px;
      font-family: 'Times New Roman', Times, serif;
    }
    .creator{
      font-size: 16px;
      font-style: italic;
      color: var(--ddd-theme-default-coalyGray);
    }

    `];
  }
  render() {
    return html`
      <div class="card" @click="${this.newWindow}" tabindex="0" @keydown="${this.keydownHandler}">
        <a href="${this.source}" target="_blank">
          <img src="${this.source}" alt="${this.alt}" />
        </a>
        <div class="details">${this.title}</div>
        <div class="creator">Media Owner: ${this.secondary_creator}</div>
      </div>
    `;
  }

  openImage() {
    window.open(this.source, '_blank');
  }

  keydownHandler(event) {
    if (event.key === 'Enter') {
      this.openImage();
    }
  }
  static get tag() {
    return "nasa-image";
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}
customElements.define(HaxCard.tag, HaxCard);