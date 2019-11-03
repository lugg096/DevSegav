export const environment = {
  production: false,
  BASE: 'http://localhost:3000/',
  PARAM: {
    TIPO_PROYECTO: 'TIPO_PROYECTO',
    TIPO_GERENCIA: 'TIPO_GERENCIA',
    DEPARTAMENTO: 'DEPARTAMENTO',
    RUBRADO_PROYECTO: 'RUBRADO_PROYECTO',
    TIPO_MONEDA: 'TIPO_MONEDA',
    PERSONAL_EJECUTORA: 'PERSONAL_EJECUTORA',
    PERSONAL_SUPERVISOR: 'PERSONAL_SUPERVISOR',
    PERSONAL_FISCALIZADOR: 'PERSONAL_FISCALIZADOR'
  },
  ROLE: {
    ADMIN: 'admin',
    EJECU: 'ejecutor',
    SUPER: 'supervisor',
    FISCA: 'fiscalizador'
  },
  MSG: {
    CLOSE_SESSION: 'Estas seguro que deseas cerrar sesión?',
    CHANGE_PASS: 'Por su seguridad, vuelva a iniciar sessión.',
    DELETE_REGIST: 'Deseas eliminar los registros seleccionados?',
    DELETE_PERS: 'Desea eliminar el personal seleccionado?',
    DELETE_ARCH: 'Deseas eliminar el archivo seleccionado?',
    DELETE_EJE: 'Desea eliminar la ejecución financiera seleccionada?',
    DELETE_RBR: 'Desea eliminar el rubro seleccionado?',
    SEND_VALOR: 'Deseas enviar la valoración del proyecto?, recuerda que no podras editar despues de enviar.',
    ACPT_VALOR: 'Deseas aceptar la valoración del proyecto?',
    OBSR_VALOR: 'Deseas observar la valoración del proyecto?',
    ERR_REGIS: 'Tuvimos problemas al guardar el registro, por favor vuelva a intentar.',
    SUCC_GUA: 'La valorización fue guardado correctamente.',
    SUCC_ENV: 'La valorización de enviado correctamente.',
    SUCC_ACP: 'La valorización fue aceptado correctamente.',
    SUCC_OBS: 'La valoración fue observado correctamente.',
    FADD_VAL: 'Deseas establer la fecha de inicio y agregar la valorización?, recuerda que no podras modificarla.',
    ADD_VAL: 'Deseas agregar la valorización?, recuerda que no podras modificarla.'
  },
  STATUS: {
    N_ENV: 0,
    ENVI: 1,
    SUP_ACEP: 2,
    FIS_ACEP: 3,
    SUP_OBSE: 4,
    FIS_OBSE: 5,
  }
};