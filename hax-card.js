import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxCard extends DDDSuper(I18NMixin(LitElement)) {

  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.imgSrc = '';
    this.dateCreated = '';
    this.dateUpdated = '';
    this.link = '';
    this.Html = '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      imgSrc: { type: String },
      dateCreated: { type: String },
      dateUpdated: { type: String },
      link: { type: String },
      html: { type: String },
    };
  }

  static get styles() {
    return css`
      .card {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 320px;
        border-radius: var(--ddd-radius-xs);
        padding: 16px;
        background-color: var(--ddd-theme-default-alertNonEmergency);
        border: 2px solid var(--ddd-theme-default-info);
        height: 480px;
        cursor: pointer;
      }
  
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
      }
      .img-container {
        width: 100%;
        border-radius: var(--ddd-radius-md);
        background-color: var(--ddd-theme-default-potential0);
        aspect-ratio: 1.5; 
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
      }
  
      .card:focus {
        background-color: var(--ddd-theme-default-successLight);
      }
  
      .card:hover {
        background-color: var(--ddd-theme-default-alertUrgent);
      }
  
      .info {
        text-align: center;
        margin-top: var(--ddd-spacing-3);
        font-size: var(--ddd-font-size-lg);
        font: var(--ddd-font-primary);
        font-weight: var(--ddd-font-weight-regular);
        color: var(--ddd-theme-default-navy80);
        line-height: var(--ddd-lh-auto);
      }
  
      .text {
        font-size: var(--ddd-font-size-m);
        font: var(--ddd-font-primary);
        color: var(--ddd-theme-default-potential-50);
        font-weight: var(--ddd-font-weight-regular);
        margin-top: 8px;
        line-height: var(--ddd-lh-auto);
        text-align: center;
      }
  
    `;
  }
  

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this.openWindow}"
        @keyup="${this.enter}"
      >
        <div class="img-container">
          <img src="${this.baseURL}/${this.logo}" alt="${this.title}" />
        </div>
        <div class="info">${this.title}</div>
        <div class="text">${this.description}</div>
      </div>
    `;
  }

  openWindow() {

      window.open((this.baseURL+'/'+this.slug), '_blank');
  }  

  enter(e) {
    if (e.key === 'Enter') {
      this.openSlug();
    }
  }

  static get tag() {
    return "hax-card";
  }
}

customElements.define(HaxCard.tag, HaxCard);