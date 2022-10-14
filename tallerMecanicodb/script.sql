--CREATE SCHEMA IF NOT EXISTS taller;
create table if not exists taller.clientes
(
    cedcliente  integer not null,
    nomcliente  varchar not null,
    apecliente  varchar not null,
    dircliente  varchar not null,
    telcliente  integer not null,
    mailcliente varchar,
    ciucliente  varchar not null,
    feccliente  date    not null,
    primary key (cedcliente)
);

alter table taller.clientes
    owner to postgres;

create table if not exists taller.vehiculos
(
    plavehiculo varchar not null,
    tipvehiculo varchar,
    modvehiculo integer,
    colvehiculo varchar,
    marvehiculo varchar,
    obsvehiculo varchar,
    cedcliente  integer,
    primary key (plavehiculo),
    constraint vehiculos_cedcliente_fk
        foreign key (cedcliente) references taller.clientes
            on delete restrict
);

alter table taller.vehiculos
    owner to postgres;

create table if not exists taller.empleados
(
    cedempleado    integer not null,
    nomempleado    varchar not null,
    apeempleado    varchar not null,
    dirempleado    varchar not null,
    telempleado    varchar not null,
    mailempleado   varchar,
    ciuempleado    varchar not null,
    fecempleado    date    not null,
    fecingempleado date    not null,
    espempleado    varchar not null,
    sueldoempleado integer not null,
    primary key (cedempleado)
);

alter table taller.empleados
    owner to postgres;

create table if not exists taller.planillas
(
    codplanilla bigserial,
    ingplanilla date    not null,
    salplanilla date,
    cedcliente  integer not null,
    plavehiculo varchar not null,
    tiptrabajo  varchar,
    cedempleado integer not null,
    destrabajo  varchar not null,
    obsplanilla varchar,
    primary key (codplanilla),
    constraint planillas_cedcliente_fk
        foreign key (cedcliente) references taller.clientes
            on delete restrict,
    constraint planillas_plavehiculo_fk
        foreign key (plavehiculo) references taller.vehiculos
            on delete restrict,
    constraint planillas_cedempleado_fk
        foreign key (cedempleado) references taller.empleados
            on delete restrict
);

alter table taller.planillas
    owner to postgres;

create table if not exists taller.productos
(
    codproducto  bigserial,
    fecproducto  date    not null,
    nomproducto  varchar not null,
    catproducto  varchar,
    pcproducto   integer not null,
    pvproducto   integer not null,
    undsproducto integer not null,
    primary key (codproducto)
);

alter table taller.productos
    owner to postgres;

create table if not exists taller.facturas
(
    numfactura   bigserial,
    fecfactura   date    not null,
    codplanilla  bigserial,
    totalfactura integer not null,
    descfactura  integer,
    formafactura varchar not null,
    obsfactura   varchar,
    primary key (numfactura),
    constraint planillas_codplanilla_fk
        foreign key (codplanilla) references taller.planillas
            on delete restrict
);

alter table taller.facturas
    owner to postgres;

create table if not exists taller.facturas_credito
(
    numfactura      bigserial,
    totalfinanciar  integer              not null,
    tiempofinanciar integer default 1    not null,
    tasainteres     integer default 0.05 not null,
    interes         integer              not null,
    constraint facturas_credito_numfactura_fk
        foreign key (numfactura) references taller.facturas
            on delete restrict
);

alter table taller.facturas_credito
    owner to postgres;


