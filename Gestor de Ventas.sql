create database gestorventas;
use gestorventas;

create table categorias(
	idCategoria int auto_increment primary key,
    nombre varchar(100) not null,
    descripcion varchar(200)
);

create table articulos(
	idArticulo int auto_increment primary key,
    nombre varchar(100) not null,
    precio decimal(11,2) not null,
    stock int not null,
    descripcion varchar(200),
    marca varchar(50) not null,
    imagen varchar(1000),
    idCategoria int,
    
    foreign key (idCategoria) references categorias(idCategoria)
);

create table ventas(
	idVenta int auto_increment primary key,
    fecha datetime not null,
    impuesto decimal(11,2) not null,
    total decimal(11,2) not null,
    tipo_pago varchar(100) not null
);

create table detalle_ventas(
	idDetalleVenta int auto_increment primary key,
    idVenta int,
    idArticulo int,
    cantidad int not null,
    
    foreign key (idVenta) references ventas(idVenta),
    foreign key (idArticulo) references articulos(idArticulo)
);

select * from articulos;
select * from categorias;

ALTER TABLE categorias CHANGE `descipcion` `descripcion` varchar(200);