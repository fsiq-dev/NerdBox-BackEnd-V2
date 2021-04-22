const caixaCTRL = require('../../controllers/caixaCTRL');
const { autorizar, ValidateDTO } = require('../../utils/middlewares.utils');
const Joi = require('joi');

const { getAllBoxCTRL, createBoxCTRL, getBoxesByIdCTRL, postRegisterSubscriptionCTRL, deleteSubscriptionCTRL, editBoxCTRL } = caixaCTRL

module.exports = (Router) => {

  //Retorna caixas existentes
  Router
    .route('/caixas')
    .get(
      getAllBoxCTRL,
    );
  
  //Cria nova caixa
  Router
    .route('/novacaixa')
    .post(
      autorizar("CREATE_BOX"),
      ValidateDTO('body', {
        name: Joi.string().required()
          .messages({
            'eny.required': `"nome" é um campo obrigatório.`,
            'string.empty': `"nome" não deve ser vazio.`,
          }),
        description:Joi.string().min(10).required()
          .messages({
            'eny.required': `"description" é um campo obrigatório.`,
            'string.empty': `"description" não deve ser vazio.`
          }),
        price: Joi.number().required()
          .messages({
          'eny.required': `"price" é um campo obrigatório.`,
          'string.empty': `"price" não deve ser vazio.`,
          'number.base': `"price" deve ser um número`,
          }),
      }),
      createBoxCTRL,
    );
  
  Router
    .route('/caixas/:idCaixa')
    .get(
      getBoxesByIdCTRL
    );

  //edita caixa
  Router
    .route('/caixas/:idCaixa')
    .put(
      autorizar("EDIT_BOX"),
      ValidateDTO('params', {
        idCaixa: Joi.number().integer().required()
        .messages({
          'eny.required': `"id" é um campo obrigatório.`,
          'number.base': `"id" deve ser um número`,
          'number.integer': `"id" deve ser um número válido`,
        }),
      }),
      ValidateDTO('body', {
        name: Joi.string().required()
          .messages({
            'eny.required': `"nome" é um campo obrigatório.`,
            'string.empty': `"nome" não deve ser vazio.`,
          }),

        description:Joi.string().min(10).required()
          .messages({
            'eny.required': `"description" é um campo obrigatório.`,
            'string.empty': `"description" não deve ser vazio.`,       
          }),

        price: Joi.number().required()
          .messages({
            'eny.required': `"price" é um campo obrigatório.`,
            'string.empty': `"price" não deve ser vazio.`,
            'number.base': `"price" deve ser um número`,
          }),
      }),
      editBoxCTRL,
    );
  
  Router
    .route('/caixas/:idCaixa/assinar')
    .post(
      autorizar(),
      postRegisterSubscriptionCTRL,
    );
  
  Router
    .route('/caixas/delete/:id')
    .delete(
      // autorizar(),
      deleteSubscriptionCTRL,
    );
};