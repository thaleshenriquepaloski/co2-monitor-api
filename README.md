CO2 Monitor API

API para monitoramento de CO2, temperatura e umidade. Cria leituras simuladas, gera alertas e envia notificação via email quando ultrapassa o limite definido na configuração.

Funcionalidades: 
- Registra leituras de CO2, umidade e temperatura.
- Envio automático de alertas por email quando CO2 ultrapassa o limite configurado
- Limite de registros antigos (mantendo apenas os mais recentes)
- Endpoints para consultar leituras, alertas e configurações.

Endpoints:
Leitura
- POST /leitura/monitoramento > Funcionalidade principal da API, usada ao iniciar a API com o nodecron e 'NPM RUN DEV'. Onde faz toda a automatização de monitoramento e alerta.
- GET /leitura/ultima > retorna a última leitura gerada
- GET /leitura/registros > retorna os registros gerados no banco
- DELETE /leitura/deletar-todos > deleta todos os registros de leitura e reinicia os IDs

Configuração
- GET /configuracao/registros > lista a configuração setada
- POST /configuracao/criar > cria a configuracao e deleta a antiga
- DELETE /configuracao/deletar > deleta a configuração. SEM CONFIG A API NÃO FUNCIONA CONFORME ESPERADO

Alertas
- GET /alerta/registros > lista os registros de alertas gerados (se a leitura que gerou o alerta tiver sido deletada (mais antiga que as últimas 10 leituras) o alerta é deletado junto).


INSTALAÇÃO DO PROJETO: 

git clone <url-do-projeto>
cd <pasta-do-projeto>
npm install

CRIE UM ARQUIVO .env:

EMAIL_USER:seu-email
EMAIL_PASS:sua-senha-app (A SENHA DE APP DO SEU GMAIL)

NPM INSTALL (instalar dependências)
RODAR AS MIGRATES: npx sequelize-cli db:migrate

NPM START / NPM RUN DEV (Configurado com nodemon)

sevidor vai rodar em: http://localhost:8000