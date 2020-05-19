import contactService from '../services/contactService'
import Contact from '../models/contact'

const list_contacts = (req, res, next) => {
  const pangolin_id = req.params.pangolin_id
  const type  = (req.query.type == null) ? 'current' : req.query.type
  contactService.list_contacts(pangolin_id, type).then((contacts) => {
    return res.status(200).send(contacts)
  }).
  catch(error => next(error))
}

const create_contact = (req, res, next) => {
  let contact = Contact({
    pangolin_id: req.params.pangolin_id,
    contact_id: req.body.contact_id,
  });
  contactService.create_contact(contact).
  then((result) => {
    const message = {'status': result.status, 'message': 'Contact successfully created'}
    return res.status(201).send(message)
  }).
  catch(error => next(error))
}

const delete_contact = (req, res, next) => {
  const pangolin_id = req.params.pangolin_id
  const contact_id = req.params.contact_id
  contactService.delete_contact(pangolin_id, contact_id).then((result) => {
    const message = {'status': result.status, 'message': 'Contact successfully deleted'}
    return res.status(200).send(message)
  }).
  catch(error => next(error))
}

  
module.exports = {
  list_contacts,
  create_contact,
  delete_contact
}
