using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Repaso.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult listarDocente()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = (from docente in bd.Docente
                         where docente.BHABILITADO.Equals(1)
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL
                         }).ToList();

            //var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { }).ToList(); ejemplo lambda
            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult filtrarDocentePorModalidad(int iimodalidad)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = (from docente in bd.Docente
                         where docente.BHABILITADO.Equals(1) 
                            && docente.IIDMODALIDADCONTRATO.Equals(iimodalidad)
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL
                         }).ToList();

            //var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { }).ToList(); ejemplo lambda
            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult listarModalidadContrato()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = (bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1)).Select(p => new
            {
                IID = p.IIDMODALIDADCONTRATO,
                p.NOMBRE
            })).ToList();
        return Json(lista, JsonRequestBehavior.AllowGet);
        }

    }
}