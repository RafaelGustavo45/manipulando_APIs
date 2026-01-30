create table nomemclatura
(
    cid_cod varchar(10) not null,
    name varchar(255) not null,
    language varchar(5) not null,
    primary key (cid_cod, language)
);


INSERT INTO nomemclatura
 (cid_cod, name, language) VALUES 
-- Registros em Português (pt-br)
('A00', 'Cólera', 'pt-br'),
('A01', 'Febres tifóide e paratifóide', 'pt-br'),
('B34', 'Doença por vírus, de localização não especificada', 'pt-br'),
('E11', 'Diabetes mellitus não-insulino-dependente', 'pt-br'),
('J11', 'Gripe [influenza], vírus não identificado', 'pt-br'),
('U07.1', 'COVID-19, vírus identificado', 'pt-br'),

-- Registros em Inglês (en-us)
('A00', 'Cholera', 'en-us'),
('A01', 'Typhoid and paratyphoid fevers', 'en-us'),
('E11', 'Non-insulin-dependent diabetes mellitus', 'en-us'),
('J11', 'Influenza, virus not identified', 'en-us'),
('U07.1', 'COVID-19, virus identified', 'en-us'),

-- Registros em Espanhol (es-es)
('A00', 'Cólera', 'es-es'),
('J11', 'Gripe [influenza], virus no identificado', 'es-es'),
('U07.1', 'COVID-19, virus identificado', 'es-es');

