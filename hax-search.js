
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./hax-card.js";


export class HaxSearch extends LitElement {
  
  constructor() {
    super();
    this.value = '';
    this.title = '';
    this.loading = false;
    this.items = [];
    this.jsonUrl = 'https://haxtheweb.org/site.json';
    this.baseUrl = this.noJsonTag(this.jsonUrl);
  }


  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      jsonUrl: { type: String },
      baseUrl: { type: String },
      items: { type: Array },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .search-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--ddd-theme-default-errorLight);
        border-radius: var(--ddd-radius-xs);
        border: 4px solid var(--ddd-theme-default-potentialMidnight);
        padding: 4px 12px;
        width: 100%;
        max-width: 400px;
        margin: 20px auto;
      }


      .input {
        font-size: 16px;
        line-height: var(--ddd-lh-auto);
      }

      .results {
        height: 100%;
      }


      input {
        font-size: 24px;
        line-height: var(--ddd-lh-auto);
        width: 100%;
      }
    `;
  }


  render() {
   
    return html`
      <h2>${this.title}</h2>
        <div class="search-wrapper">
          <input id="input" class="input" placeholder="https://haxtheweb.org/site.json" @input="${this.inputChanged}" />
          <div class="search-button"><button @click="${this.analyze}">Analyze Site!</button></div>
        </div>
        <div class="results">
          
        ${this.items.map((item) => {
          const img = item.metadata && item.metadata.files && item.metadata.files[0] ? item.metadata.files[0].url : '';

          return html`
            <hax-card
              title="${item.title}"
              description="${item.description}"
              logo="${img}"
              slug="${item.slug}"
              baseURL="${this.baseUrl}"
            ></hax-card>
          `;
        })}
      </div>
      
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }

    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }
  noJsonTag(url) {
    return url.replace(/\/?[^\/]*\.json$/, '');
  }
  
  updateResults(value) {
    this.loading = true;
    this.baseUrl = this.noJsonTag(this.jsonUrl);
    fetch(this.jsonUrl)
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        if (data && Array.isArray(data.items)) {
          this.items = data.items.filter(item => 
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.description.toLowerCase().includes(value.toLowerCase())
          );
        }
        this.loading = false;
      });
  }


  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);