import showModal from 'discourse/lib/show-modal';
import { locationFormat } from '../lib/location-utilities';
import { default as computed } from 'discourse-common/utils/decorators';

export default Ember.Component.extend({
  classNames: ['location-label'],

  didInsertElement() {
    $('.title-and-category').toggleClass('location-add-no-text', this.get("iconOnly"));
  },

  @computed('noText')
  iconOnly(noText) {
    return noText|| Discourse.SiteSettings.location_add_no_text;
  },

  @computed('noText')
  valueClasses(noText) {
    let classes = "add-location-btn";
    if (noText) classes += " btn-primary";
    return classes;
  },

  @computed('location', 'noText')
  valueLabel(location, noText) {
    return noText ? '' : locationFormat(location);
  },

  @computed('noText')
  addLabel(noText) {
    return noText ? '' : 'composer.location.btn';
  },

  actions: {
    showAddLocation() {
      let controller = showModal('add-location', { model: {
        location: this.get('location'),
        categoryId: this.get('category.id'),
        update: (location) => {
          if (this._state !== 'destroying') {
            this.set('location', location);
          }
        }
      }});

      controller.setup();
    },

    removeLocation() {
      this.set('location', null);
    }
  }
});
