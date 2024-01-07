program binario;

uses
math,sysutils;


var

entrada:string;
erro: byte;

procedure checar_se_numero;
var
 saida: integer;

begin

  repeat
    write('insira um numero binario para representar um inteiro: ');
    readln(entrada);
    val(entrada,saida,erro);

  until (erro = 0);
end;

procedure checar_se_binario;
var
 indice: integer;

begin
  for indice:= 1 to length(entrada)  do
  begin
    if (entrada[indice] = '1') or (entrada[indice] = '0') then
    begin

    end
    else
    begin
         writeln('nao e bit');
         checar_se_numero;
         checar_se_binario;
    end;
  end;

end;

procedure transformar_em_inteiro;

var
 i: LongInt;
 expoente,termo: Int64;

begin

  expoente:= 0;
  termo:= 0;
  for i:= length(entrada) downto 2 do
  begin
    termo:= StrToInt(entrada[i])*(2**expoente) + termo;
    expoente:= expoente + 1;
  end;
  if entrada[1] = '1' then
  begin
    termo:= -1*termo
  end;
  writeln(termo);
end;

begin
  while true do
  begin
  checar_se_numero;
  checar_se_binario;
  transformar_em_inteiro;
  sleep(500);
  end;

end.

