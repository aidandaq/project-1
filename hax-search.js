import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-card.js";
import "./hax-overview.js"; 

export class HaxSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      data: { type: Object },
      jsonUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.title = '';
    this.loading = false;
    this.items = [];
    this.data = null; 
    this.jsonUrl = '';
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        width: 100%;
      }
      `];
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <div class="search-container">
        <input
          id="input"
          class="search-input"
          placeholder="https://haxtheweb.org/sit.json"
          @keydown="${this.handleKeyDown}"
          @input="${this.inputChanged}"
           />
          <button ?disabled="${!this.isValidUrl}" @click="${this.analyze}">Analyze!</button>
      </div>

      ${this.data?.name
        ? html`
          <div class="siteOverview-container"></div-class>
           <site-overview
              title="${this.data.name}"
              description="${this.data.description}"
              logo="${this.data.metadata.site.logo}"
              dateCreated="${this.formatDate(this.data.metadata.site.created)}"
              dateUpdated="${this.formatDate(this.data.metadata.site.updated)}"
              hexCode="${this.data.metadata.theme.variables.hexCode}"
              theme="${this.data.metadata.theme.name}"
              icon="${this.data.metadata.theme.variables.icon}"
              jsonUrl="${this.jsonUrl}"
           
          ></site-overview>
          </div>
        `
        : ''}

        <div class="results-container">
          ${this.items.length===0
             ? console.log('items array is empty')
          : this.items.map(item => 
          html`
            <hax-card
              title="${item.title}"
              description="${item.description}"
              dateCreated="${this.formatDate(item.metadata.created)}"
              dateUpdated="${item.formatDate(item.metadata.updated)}"
              logo="${item.metadata.site.logo}"
              slug="https://haxtheweb.org/${item.slug}"
              jsonUrl="${this.jsonUrl}"
              indexSource="https://haxtheweb.org/${item.location}"
            ></hax-card>
          `)}
          </div>
              `;
          
          }

          inputChanged(e) {
            this.jsonUrl = e.target.value.trim();
            this.isValidUrl = !!this.jsonUrl;
          }

          handleKeyDown(e) {
            if (e.key === 'Enter' && this.isValidUrl) {
              this.analyze();
            }
          }


      
    `;
  }