/* 
	Lagartixa é uma ferramenta livre para geração de LSP
        Copyright (C) 2005 Marcio Junior Vieira

        Esta Biblioteca é um software livre; você pode redistribuir e/ou
        modificar sob os termos da GNU General Public License publicada
        pela Free Software Foundation; versão 2.1

        You should have received a copy of the GNU Lesser General Public
        License along with this package; if not, write to the Free Software
        Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

        Home Page http://lagartixa.codigolivre.org.br

        Projeto Lagartixa - Gerador de LSP.
        Ambiente Livre Tecnologia - www.ambientelivre.com.br

*/

function CreateCursor(){

   var tableMain      = document.getElementById("Table1").value;  
   var fieldList      = new Array();                               /* List of Fields   */
   var fieldWhereList = new Array();                               /* List of Where Fields   */
   var fieldWhereLast = new Array();                               /* List of Where Last Fields   */   
   var cursorX        = "";                                        /* cursor result    */
   var vectorField    = "";                                        /* Fields of Cursor */
   var typeField      = "";
 
   var cursorX = "Definir Cursor Cur_" + tableMain + "; /* Gerado pelo Lagartixa GPL */\n";   
   cursorX = cursorX + "\n";


   /* Amount of fields for seach  4 */
   
   
   
   for (i=0;i<4;i++)   
     {
        idField      = "Field" + i;
        fieldList[i] = document.getElementById(idField);

        idFieldA    = "ARadio" + i;	
        fieldTypeA = document.getElementById(idFieldA);
        idFieldD    = "DRadio" + i;		
        fieldTypeD = document.getElementById(idFieldD);
        idFieldN    = "NRadio" + i;			
        fieldTypeN = document.getElementById(idFieldN);	
	
        if ( fieldTypeA.selected )
           define = "Definir Alfa v"; 	      
        if ( fieldTypeD.selected )
           define = "Definir Data d"; 	      
        if ( fieldTypeN.selected )
           define = "Definir Numero x"; 	      
	
	
	if ( fieldList[i].value != "" )
	   {
          	       
              cursorX  = cursorX + define + fieldList[i].value + ";\n" ;
	      if ( i != 0 )
   	         vectorField = vectorField + ", ";
	         
      	      vectorField = vectorField + tableMain + "." + fieldList[i].value ;
	   }
     }

   for (i=0;i<4;i++)   
     {
        idFieldWhere      = "Where" + i;
        fieldWhereList[i] = document.getElementById(idFieldWhere);
	
       idFieldA    = "ARadioWhere" + i;	
       fieldTypeA = document.getElementById(idFieldA);
       idFieldD    = "DRadioWhere" + i;		
       fieldTypeD = document.getElementById(idFieldD);
       idFieldN    = "NRadioWhere" + i;			
       fieldTypeN = document.getElementById(idFieldN);	

       if ( fieldTypeA.selected )
          define = "Definir Alfa v"; 	      
       if ( fieldTypeD.selected )
          define = "Definir Data v"; 	      
       if ( fieldTypeN.selected )
          define = "Definir Numero v"; 	      
	
	
       if ( fieldWhereList[i].value != "" )
	   {
              cursorX  = cursorX + define + fieldWhereList[i].value + ";\n" ;
	   }
     }



   cursorX = cursorX + "\n";
   cursorX = cursorX + "Cur_" + tableMain + ".Sql \"SELECT "  + vectorField + " \\\n" ;
   cursorX = cursorX + "                              FROM " + tableMain + " \\\n"; 

   for (i=0;i<4;i++)   
   {

     idFieldWhere      = "Where" + i;
     fieldWhereList[i] = document.getElementById(idFieldWhere);
     
     /* Verifica se existem mais campos na clausula where, para poder encerrar a clausula com ';' */
     if ( i != 3)
       {
         ii  = i +1;     
         idFieldWhereLast  = "Where" + ii;         
         fieldWhereLast    = document.getElementById(idFieldWhereLast);
	
       }
     
	
     if (fieldWhereList[i].value != "" )	
     {  

       idFieldA    = "ARadioWhere" + i;	
       fieldTypeA = document.getElementById(idFieldA);
       idFieldD    = "DRadioWhere" + i;		
       fieldTypeD = document.getElementById(idFieldD);
       idFieldN    = "NRadioWhere" + i;			
       fieldTypeN = document.getElementById(idFieldN);	

       if ( fieldTypeA.selected )
          define = " = :v"; 	      
       if ( fieldTypeD.selected )
          define = " = :d"; 	      
       if ( fieldTypeN.selected )
          define = " = :x"; 	      

       if ( i == 0)
	 {
	   if (fieldWhereLast.value != "" )
             cursorX = cursorX + "                   WHERE "+ tableMain + "." + fieldWhereList[i].value + define + fieldWhereList[i].value + " \\\n";
	   else 
             cursorX = cursorX + "                   WHERE "+ tableMain + "." + fieldWhereList[i].value + define + fieldWhereList[i].value + ";\n";	     
	 }
       else 
  	 {
	   if ((fieldWhereLast.value != "" ) && ( i != 3))
             cursorX = cursorX + "                      AND "+ tableMain + "." + fieldWhereList[i].value + define + fieldWhereList[i].value + " \\\n";
           else	
             cursorX = cursorX + "                      AND "+ tableMain + "." + fieldWhereList[i].value + define + fieldWhereList[i].value + ";\n";
	 }
	   
     }   
   }
   


   cursorX = cursorX + "Cur_" + tableMain + ".AbrirCursor(); \n";
   cursorX = cursorX + "Se (Cur_" + tableMain + ".Achou) \n   { \n";


  for (i=0;i<4;i++)
    {
    
       idField = "Field" + i;
       fieldList[i] = document.getElementById(idField);

       idFieldA    = "ARadio" + i;	
       fieldTypeA = document.getElementById(idFieldA);
       idFieldD    = "DRadio" + i;		
       fieldTypeD = document.getElementById(idFieldD);
       idFieldN    = "NRadio" + i;			
       fieldTypeN = document.getElementById(idFieldN);	

       if ( fieldTypeA.selected )
          define = "      v"; 	      
       if ( fieldTypeD.selected )
          define = "      d"; 	      
       if ( fieldTypeN.selected )
          define = "      x"; 	      

       if (fieldList[i].value != "" )
         {
              cursorX = cursorX + define + fieldList[i].value + " = Cur_" + tableMain + "." + fieldList[i].value + ";\n";
         } 
    }


   cursorX = cursorX + "   }\n";
   cursorX = cursorX + "Cur_" + tableMain + ".FecharCursor(); \n";


   TextAreaLSP = document.getElementById("sourceLSP");
   TextAreaLSP.setAttribute("value",cursorX);


/*

                while (countList != 5 ) {

   
   
   
                 if (this.fieldList[countList] != null && !this.fieldList[countList].equals("")) {
                                buffer.append("Definir Alfa v" + this.fieldList[countList] + ";\n");
                                vectorField = vectorField + this.tableMain + "." + this.fieldList[countList] + ", ";
                        }
                        countList++;
                }

                buffer.append("\n");

                buffer.append("Cur_" + this.tableMain + ".Sql \"SELECT " + vectorField + " \\\n" );
                buffer.append("                    FROM " + this.tableMain + " \\\n" );

                countList = 1;
                while (countList != 5 ) {

                        if (this.fieldWhereList[countList] != null && !this.fieldWhereList[countList].equals("")) {


                if ( this.fieldWhereList[countList] != null)
                {
                        if ( countList == 1)
                                        buffer.append("                   WHERE "+ this.tableMain + "." + this.fieldWhereList[countList] + " = :v" + this.fieldWhereList[countList] + " \\\n" );
                        else
                                buffer.append("                      AND "+ this.tableMain + "." + this.fieldWhereList[countList] + " = :v" + this.fieldWhereList[countList] + " \\\n" );

                }
                        }
                        countList++;
                }

                buffer.append("Cur_" + this.tableMain + ".AbrirCursor();\n" );
                buffer.append("Se ( Cur_" + this.tableMain + ".Achou )\n");
                buffer.append("   {\n");
   countList = 1;
                while (countList != 5 ) {
                        if (this.fieldList[countList] != null && !this.fieldList[countList].equals(""))
                                buffer.append("      v" + this.fieldList[countList] + "= Cur_" + this.tableMain + "." + this.fieldList[countList] + ";\n" );
                        countList++;
                }
                buffer.append("   }\n");
                buffer.append("Cur_" + this.tableMain + ".FecharCursor();\n" );
                return buffer.toString();
        }

   
   
   
  */ 
   
   
   
   
/*   alert('javascript external'); */
   
}
