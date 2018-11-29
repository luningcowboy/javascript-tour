using System;
using System.IO;
namespace helloWorld
{

    class Rectangle{
        double length;
        double width;
        public Rectangle(){
            // * 构造函数
            Console.WriteLine("构造函数");
        }
        ~Rectangle(){
            // * 析构函数
            Console.WriteLine("析构函数");
        }
        public void Acceptdetails(){
            length = 4.5;
            width = 4.5;
        }
        public double GetArea(){
            return length * width;
        }

        public void Display(){
            Console.WriteLine("Length:{0}",length);
            Console.WriteLine("Width:{0}", width);
            Console.WriteLine("Area:{0}", GetArea());
        }
    }

    struct Books{
        private string title;
        private string author;
        private string subject;
        private int book_id;
        public void init(string t, string a, string s, int id){
            title = t;
            author = a;
            subject = s;
            book_id = id;
        }
        public void display(){
            Console.WriteLine("Title:{0}", title);
            Console.WriteLine("Author:{0}", author);
            Console.WriteLine("Subject:{0}", subject);
            Console.WriteLine("BookId:{0}", book_id);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Rectangle r = new Rectangle();
            r.Acceptdetails();
            r.Display();


            Console.WriteLine("Size of int:{0}", sizeof(int));
            Console.WriteLine("Size of bool:{0}", sizeof(bool));
            Console.WriteLine("Size of decimal:{0}", sizeof(decimal));

            // 类型转换
            double d = 123.453;
            int i = 0;

            i = (int)d;
            Console.WriteLine("{0},{1}",d,i);
            // 类型转换方法
            float f = 53.005f;
            bool b = true;
            Console.WriteLine(i.ToString());
            Console.WriteLine(f.ToString());
            Console.WriteLine(d.ToString());
            Console.WriteLine(b.ToString());

            Books b1 = new Books();
            Books b2 = new Books();

            b1.init("b1","bb1","bbb1",0);
            b2.init("b2","bb2","bbb2",1);

            b1.display();
            b2.display();

            
        }
    }
}
