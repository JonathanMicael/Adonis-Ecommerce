'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ['image']
  }
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      // add your transformation object here
      id: model.id,
      name: model.name,
      lastName: model.lastName,
      username: model.username,
      email: model.email,
      country: model.country,
      address: model.address,
      birthday: model.birthday,
      cpf: model.cpf
    }
  }
  includeImage(user) {
    return this.item(user.getRelated('image'), ImageTransformer)
  }
}

module.exports = UserTransformer
