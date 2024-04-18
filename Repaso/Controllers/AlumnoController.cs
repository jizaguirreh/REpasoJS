using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Repaso.Controllers
{
    public class AlumnoController : Controller
    {
        PruebaDataContext bd = new PruebaDataContext(); // Para no tener que ejecutarlo en cada Action/Método

        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult listarSexo()
        {
            var lista = bd.Sexo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new
                //{ p.IIDSEXO, p.NOMBRE });
                { IID= p.IIDSEXO, p.NOMBRE });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult listarAlumnos()
        {
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new
                {
                    p.IIDALUMNO,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.TELEFONOPADRE
                }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult filtrarAlumnoPorSexo(int iidsexo)
        {
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDSEXO.Equals(iidsexo))
                .Select(p => new
                {
                    p.IIDALUMNO,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.TELEFONOPADRE
                }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}