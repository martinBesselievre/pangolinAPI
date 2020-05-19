import Pangolin from '../models/pangolin'
import Contact from '../models/contact'
import { ObjectNotFoundError } from '../helpers/errors'


const not_already_contact = (contact, pangolin_contacts) => {
  let already_contact = false
  pangolin_contacts.map((item) => {
     if (contact.contact_id == item.contact_id) {
       already_contact = true
     }
  })
  return (!already_contact)
}

const build_available_contacts_list = (pangolin_id, pangolins) => {
  let counter = 0
  let list = []
  let pangolin_contacts = []
  return new Promise(function(resolve,reject) {
    pangolins.forEach((pangolin, index, array) => {
      Contact.find({'pangolin_id': pangolin.id}).then((contacts) => {
        counter = counter + 1;
        if (contacts.length==0) {
          if (pangolin.id != pangolin_id) {
            list.push({
                  'pangolin_id': -1,
                  'contact_id': pangolin.id,
                  'contact_name': pangolin.name,
                  'contact_age': pangolin.age,
                  'contact_family': pangolin.family,
                  'contact_race': pangolin.race,
                  'contact_food': pangolin.food,
                  'contact_lat': pangolin.lat,
                  'contact_lng': pangolin.lng})
          }
        }
        else {
          pangolin_contacts = contacts
        }
        if (counter == pangolins.length) {
            list = list.filter(contact => not_already_contact(contact, pangolin_contacts))
            resolve(list)
        }
      }) 
    })
  })
}

const build_current_contacts_list = (pangolin) => {
  let counter = 0
  let list = []
  return new Promise(function(resolve,reject) {
      Contact.find({'pangolin_id': pangolin.id}).then((contacts) => {
        if (contacts.length == 0) {
          resolve(list)
        }
        else {
          contacts.forEach((contact) => {
            Pangolin.findById(contact.contact_id).then((pangolin) => {
               counter = counter + 1;
               list.push({'pangolin_id': contact.pangolin_id,
                    'contact_id': pangolin._id,
                    'contact_name': pangolin.name,
                    'contact_age': pangolin.age,
                    'contact_family': pangolin.family,
                    'contact_race': pangolin.race,
                    'contact_food': pangolin.food,
                    'contact_lat': pangolin.lat,
                    'contact_lng': pangolin.lng})
               if (counter == contacts.length) {
                  resolve(list)
               }
            })
          })
        }
      }) 
    })
}


const list_contacts = (pangolin_id, type) => {
  return Pangolin.findById(pangolin_id).then((pangolin) => {
    if (!pangolin) {
      throw new ObjectNotFoundError('Pangolin', pangolin_id)
    }
    else {
      if (type=='current') {
          const contacts = Pangolin.findById(pangolin_id).then(build_current_contacts_list.bind(null))
          return contacts 
      }
      else {  
        const contacts = Pangolin.find({}).then(build_available_contacts_list.bind(null, pangolin_id))
        return contacts
      }
    }
  })
}

const create_contact = (contact) => {
  return contact.save().then(() => {
    const status = {'status': 'success'}
    return status
  })
}

const delete_contact = (pangolin_id, contact_id) => {
  return Contact.remove({pangolin_id: pangolin_id,  contact_id: contact_id}).then(() => {
    const status = {'status': 'success'}
    return status
  })
}

module.exports = {
  list_contacts,
  create_contact,
  delete_contact
}